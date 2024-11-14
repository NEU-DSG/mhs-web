import json
import csv
import pandas as pd
from pathlib import Path

master_folder = Path(__file__).parent.parent.parent.parent

colors = ['#9C125F',
          '#5F9C28',
          '#ED1555',
          '#7DE635',
          '#A94946',
          '#FDB2CC',
          '#FF108B',
          '#B730C8',
          '#3EE0B8',
          '#C2E0FC',
          '#B635CA',
          '#5DCA76',
          '#4F6608',
          '#9A8FEC',
          '#382D03',
          '#2029F3',
          '#254B14',
          '#BBD44A',
          '#295126',
          '#5FFFDF',
          '#79886D',
          '#439E82',
          '#B01127',
          '#A150BB',
          '#0982CE',
          '#DBADAC',
          '#F48CB2',
          '#22E6CF',
          '#79227B',
          '#441580',
          '#BDF266',
          '#E12498',
          '#6468A2',
          '#D49F59',
          '#B20813',
          '#AEB268',
          '#63F98D',
          '#BE7E10',
          '#65E40D',
          '#775493',
          '#7C8A9E',
          '#32FF14',
          '#423322',
          '#C9F446',
          '#E03084']

with open(master_folder / "data" / "timeline" / 'umbrellas.json', 'r') as file:
    umbrellas = list(json.load(file).keys())

with open(master_folder / "data" / "timeline" / 'topiccategories.json', 'r') as file:
    categories = json.load(file)

i = 0

# Pairs each category with a color
color_dict = {}
for umb in umbrellas:
    color_dict[umb] = colors[i]
    i += 1


def getcolors(datafile, output, collection):
    colors_list = []


    # Unique rows in the order they appear
    topics = list(pd.read_csv(master_folder / "data" / collection / "timeline" / datafile)["Role"].drop_duplicates())

    for topic in topics:
        topic = topic.replace("Topic, ","")

        # skips header if present
        if list(topic)[0] == " ":
            colors_list.append(color_dict[topic.replace(" • ", "").strip()])

        # Adds color to color list in order it will appear 
        else:
            colors_list.append(color_dict[categories[topic][0]])

    with open(master_folder / "data" / collection / "timeline" / output, 'w') as file:
        wr = csv.writer(file, quoting=csv.QUOTE_ALL, delimiter=',')
        wr.writerow(colors_list)


getcolors("sortedtimeline.csv", "sortedcolors.csv", "jqa")
getcolors("sortedtimeline.csv", "sortedcolors.csv", "rbt")
getcolors("sortedtimeline.csv", "sortedcolors.csv", "cmsol")
