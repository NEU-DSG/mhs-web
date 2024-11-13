import requests
import json
import pandas as pd
from pathlib import Path

master_folder = Path(__file__).parent.parent.parent.parent


def create_umbrellas(datafile):
    # Get the current directory of the script

    """

    Args:
        datafile: the data to make the timeline chart

    Returns:

    """
    # Gets all topics
    res = requests.get('https://primarysourcecoop.org/subjectsmanager/ext/getallfromdb/')
    topics = json.loads(res.text)

    all_topics = []

    #  All umbrellas
    umbrellas = []

    # Umbrellas : [All that fall under it]
    umbrellas_dict = {}

    # Gets list of all umbrellas
    for topic in topics:
        all_topics.append(topic["topic_name"])
        if topic['is_umbrella'] == "1":
            umbrellas.append(topic['topic_name'])

    # Topics that fall under an umbrella
    umb_topics = []
    for umbrella in umbrellas:
        res = requests.get('https://www.primarysourcecoop.org/subjectsmanager/getsubtopics?topic=' + umbrella)
        data = json.loads(res.text)

        # list of all topics under a certain umbrella
        topics_list = list(set().union(*(d.values() for d in data)))

        # keeps track of topics with an umbrella
        umb_topics.extend(topics_list)

        # Keeps track of what topics are under what umbrella
        umbrellas_dict[umbrella] = topics_list

    # Gets a set of all topics that do not fall under an umbrella
    no_umb1 = set(all_topics) - set(umb_topics)

    if len(datafile) == 1:
        no_umb2 = set(pd.read_csv(master_folder / "data" / "timeline" / "Raw Data" / datafile[0])["subjects"]) - set(
            all_topics)
    elif len(datafile) > 1:
        all_subjects = set()

        for i in range(len(datafile)):
            subjects = pd.read_csv(master_folder / "data" / "timeline" / "Raw Data" / datafile[i])["subjects"]
            all_subjects.update(subjects)

        no_umb2 = all_subjects - set(all_topics)

    umbrellas_dict["Uncategorized"] = list(no_umb1 | no_umb2)

    # Key: Topic, Value: [All the umbrellas it is under]
    topics_umbrellas = {}

    # For each topic under a certain umbrella-
    for umbrella in (list(umbrellas_dict.keys())):

        for topic in umbrellas_dict[umbrella]:

            # If it already has an entry in the dictionary, add the new umbrella

            if topic in topics_umbrellas:
                topics_umbrellas[topic].append(umbrella)

            # If it has not yet been added, create a new entry with the umbrella
            else:
                topics_umbrellas[topic] = [umbrella]

    # This writes the JSON file that is Umbrella: all that fall under it
    with open(master_folder / "data" / "timeline" / "umbrellas.json", "w") as outfile:
        print("Succesfully wrote to 'umbrellas.json'")
        json.dump(umbrellas_dict, outfile, indent=4)

    # This writes the JSON file that is topic: all umbrellas it falls under
    with open(master_folder / "data" / "timeline" / "topiccategories.json", "w") as outfile:
        print("Succesfully wrote to 'topiccategories.json'")
        json.dump(topics_umbrellas, outfile, indent=4)


create_umbrellas(['1779_1848.csv', 'cmsol_subjects.csv', 'rbt_subjects.csv'])

"""
Output is: 
{'Elections', 'Religion', 'Food and Drink', 'Slavery and Enslaved Persons', 'Economics', 'Politics', 'Education', 'Work'}

- Elections, Religion, Food and Drink, Economics, Politics, Education, Work are topics of their own umbrella 

- "Slavery and Enslaved Persons" is an umbrella holding 2 topics, but is also a topic in "Slavery and Enslaved People"
    Neither of the topics in 'Persons' is in 'People' 


"""
