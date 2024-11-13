import requests
import json
import pandas as pd
from pathlib import Path
import argparse
import certifi



def writeJSON(input_dict, output_filepath):
    """
    Writes a python dictionary to a specified JSON filepath
    Args:
        input_dict: the dictionary to convert to JSON
        output_filepath: the name of the file that will hold the json (include.json)

    Returns:

    """
    # This writes the JSON file that is topic: all umbrellas it falls under
    with open(output_filepath, "w") as outfile:
        print("Succesfully wrote to " + output_filepath)
        json.dump(input_dict, outfile, indent=4)

def create_umbrella_to_topics(folder_path):
    # Get the current directory of the script

    """

    Args:
        datafile: the data to make the timeline chart

    Returns:

    """
    all_topics_from_api = []
    all_umbrellas_from_api = []

    umbrella_to_topic_dict = {}

    # Gets all topics in the API data
    APITopics = json.loads(requests.get('https://primarysourcecoop.org/subjectsmanager/ext/getallfromdb/', verify=False).text,)


    for topic in APITopics:
        # Adds every topic to the all_topics list
        all_topics_from_api.append(topic["topic_name"])

        # If umbrella, adds the topic to the umbrellas list
        if topic['is_umbrella'] == "1":
            all_umbrellas_from_api.append(topic['topic_name'])

    # Topics that fall under a particular umbrella
    api_topics_with_umbrellas = []
    for umbrella in all_umbrellas_from_api:
        res = requests.get('https://www.primarysourcecoop.org/subjectsmanager/getsubtopics?topic=' + umbrella, verify=False)
        data = json.loads(res.text)

        # list of all topics under a certain umbrella
        # topics_list = list(set().union(*(d.values() for d in data)))
        topics_list = list({value for d in data for value in d.values()})

        # keeps track of topics with an umbrella
        api_topics_with_umbrellas.extend(topics_list)

        # Keeps track of what topics are under what umbrella
        umbrella_to_topic_dict[umbrella] = topics_list

    # Gets a set of all topics that do not fall under an umbrella
    api_topics_no_umb = set(all_topics_from_api) - set(api_topics_with_umbrellas)

    # Collect all CSV files from the provided folder
    folder = Path(folder_path)
    csv_files = list(folder.glob("*.csv"))
    all_topics_from_csvs = set()

    for file in csv_files:
        topics = pd.read_csv(file)["subjects"]
        all_topics_from_csvs.update(topics)

    # All the topics in the data
    csv_topics_no_umb = all_topics_from_csvs - set(all_topics_from_api)

    umbrella_to_topic_dict["Uncategorized"] = list(api_topics_no_umb | csv_topics_no_umb)

    return umbrella_to_topic_dict

def create_topic_to_umbrellas(umbrella_to_topic_dict):
    # Key: Topic, Value: [All the umbrellas it is under]
    topics_umbrellas = {}
    for umbrella, topics in umbrella_to_topic_dict.items():
        for topic in topics:
            # Use setdefault to create a list if the key doesn't exist
            topics_umbrellas.setdefault(topic, []).append(umbrella)
    return topics_umbrellas

def main():
    parser = argparse.ArgumentParser(description="Create umbrella topic mappings from API and CSV data.")
    parser.add_argument('folder', help='Folder containing CSV data files.')
    parser.add_argument('umbrella_topic', help='Output file for umbrella to topic file')
    parser.add_argument('topic_umbrella', help='Output file for topic to umbrella file.')

    args = parser.parse_args()
    umbrella_to_topic_dict = create_umbrella_to_topics(args.folder)
    topic_to_umbrellas_dict = create_topic_to_umbrellas(umbrella_to_topic_dict)
    writeJSON(umbrella_to_topic_dict, args.umbrella_topic)
    writeJSON(topic_to_umbrellas_dict, args.topic_umbrella)

if __name__ == "__main__":
    main()
