import pandas as pd
import csv
import json
from datetime import datetime
import argparse

# Function to parse date strings
def parse_date(date_str):
    return datetime.strptime(date_str, '%Y-%m-%d')

# Function to get the union of date ranges
def get_union_of_date_ranges(data):
    date_ranges = []

    for row in data:
        if len(row) == 4:  # Only process rows with date ranges
            start_date = parse_date(row[2])
            end_date = parse_date(row[3])
            date_ranges.append((start_date, end_date))

    if not date_ranges:
        return []

    # Sort the date ranges by start date
    date_ranges.sort()

    # Merge overlapping or consecutive date ranges
    merged_ranges = []
    current_start, current_end = date_ranges[0]

    for start, end in date_ranges[1:]:
        if start <= current_end:  # Overlapping or conscutive ranges
            current_end = max(current_end, end)
        else:
            merged_ranges.append((current_start, current_end))
            current_start, current_end = start, end

    merged_ranges.append((current_start, current_end))

    return merged_ranges

# Function to return the union of date ranges in the requested structure
def format_union_of_date_ranges(data, header):
    title = header.replace(" • ", "").strip()
    union_ranges = get_union_of_date_ranges(data)

    # Prepare the output list where each range gets its own entry
    formatted_output = []
    for start, end in union_ranges:
        formatted_output.append([header, title, str(start.date()), str(end.date())])

    return formatted_output

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

# gets umbrellas list
with open('umbrellas.json', 'r') as file:
    umbs = json.load(file)
umbs = list(umbs.keys())

i = 0
# Pairs each category with a color
color_dict = {}
for umb in umbs:
    color_dict[umb] = colors[i]
    i += 1

# Gets a dict of topic : umbrella
with open('topiccategories.json', 'r') as file:
    categories = json.load(file)

# Right now, just taking the first umbrella for a certain topic
Category_list = {key: value[0] for key, value in categories.items()}


def createTimelineData(filepath, output):
    """

    Args:

        filepath: (str) csv file of data
        output: (str) csv filename to output

    Returns:

    """
    # Subject : Year Ranges
    sub_dict = {}

    df = pd.read_csv(filepath, sep=",")

    # Iterates through each subject..
    for subject in df.subjects.unique():
        year_ranges = []

        # All the years a particular subject is mentioned
        filtered_years = df['year'][df['subjects'] == subject].tolist()

        # If there is only oen year, it is set as the start and end date
        if len(filtered_years) == 1:
            year_ranges.append([filtered_years[0], filtered_years[0]])

        # If there is more than one -
        else:
            current_range = [filtered_years[0]]

            for i in range(1, len(filtered_years)):
                # If the current year is consecutive to the previous year, extend the range
                if filtered_years[i] == filtered_years[i - 1] + 1:
                    current_range.append(filtered_years[i])
                else:
                    # If there is only oen year, it is set as the start and end date
                    if len(current_range) == 1:
                        current_range.append(current_range[0])
                    # Otherwise, close the current range and start a new one
                    year_ranges.append(current_range)
                    current_range = [filtered_years[i]]

            # If there is only oen year, it is set as the start and end date
            if len(current_range) == 1:
                current_range.append(current_range[0])

            # Add the last range to the list
            if current_range:
                year_ranges.append(current_range)

        sub_dict[subject] = year_ranges

    # The headers for the timeline
    csv_lines = []


    for subject in sub_dict:

        # Creates a new line in the csv for each time range entry
        for year_range in sub_dict[subject]:

            if subject in umbs:

                new_line = ["Topic, "+subject, "Topic, "+subject, str(min(year_range)) + "-01-02", str(max(year_range)) + "-12-31"]
            else:
                new_line = [subject, subject, str(min(year_range)) + "-01-02", str(max(year_range)) + "-12-31"]
            csv_lines.append(new_line)

    # Removes headers and gets list of categories

    categories = list(set(list(Category_list.values())))
    newlines = [["Role", "Name", "Start", "End"]]

    # Adds a header row for each category, followed by the relevant topics
    for cat in categories:
        incat = [[" • " + cat + " • "]]

        for line in range(len(csv_lines)):

            if Category_list[csv_lines[line][1].replace("Topic, ","")] == cat:
                incat.append(csv_lines[line])
        
        for line in csv_lines:

            if Category_list[line[1].replace("Topic, ","")] == cat:
                incat.append(line)

        # A len of one means this is an umbrella with no entries (other than the header column)
        if len(incat) > 1:

            all = incat[:]
            cat = all.pop(0)

            catlines = []
            for each in all:

                new = [cat[0], each[1], each[2], each[3]]
                catlines.append(new)
                

            formatted_union = format_union_of_date_ranges(incat, incat[0][0])


            incat[0] = formatted_union[0]
            formatted_union.pop(0)
            
            for entry in formatted_union:
                incat.append(entry)

            catlines.extend(incat)

            newlines += catlines

    with open(output, 'w', newline='') as f:
        print('Successfully wrote to: ' + output)
        writer = csv.writer(f)
        writer.writerows(newlines)

def getcolors(datafile, output):
    colors_list = []


    # Unique rows in the order they appear
    topics = list(pd.read_csv(datafile)["Role"].drop_duplicates())

    for topic in topics:
        topic = topic.replace("Topic, ","")

        # skips header if present
        if list(topic)[0] == " ":
            colors_list.append(color_dict[topic.replace(" • ", "").strip()])

        # Adds color to color list in order it will appear
        else:
            colors_list.append(color_dict[categories[topic][0]])

    with open(output, 'w') as file:
        wr = csv.writer(file, quoting=csv.QUOTE_ALL, delimiter=',')
        wr.writerow(colors_list)

def timelineFunc(filepath,datafile,colorfile):
    createTimelineData(filepath, datafile)
    getcolors(datafile, colorfile)

def main():
    parser = argparse.ArgumentParser(description="Generate timeline data and colors.")
    parser.add_argument('input', type=str, help='Input CSV file with subjects and years.')
    parser.add_argument('datafile', type=str, help='Output CSV file for timeline data.')
    parser.add_argument('colorfile', type=str, help='Output CSV file for color mapping.')

    args = parser.parse_args()
    timelineFunc(args.input, args.datafile, args.colorfile)

if __name__ == "__main__":
    main()


#createTimelineData("1779_1848.csv", "sortedtimeline.csv")

#createTimelineData("rbt_subjects.csv", "sortedtimeline.csv")

#createTimelineData("cmsol_subjects.csv", "sortedtimeline.csv")

#timelineFunc("rbt_subjects.csv", "sortedtimeline.csv","sortedcolors.csv")
