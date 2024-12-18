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
    return merged_ranges

# Function to return the union of date ranges in the requested structure
def format_union_of_date_ranges(data, header):
    return formatted_output


def create_sub_dict(filepath):
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
 # Iterates through each subject..
    for subject in df.subjects.unique():
        year_ranges = []

        # A list of all the years a particular subject is mentioned
        filtered_years = df['year'][df['subjects'] == subject].tolist()

        # If the subject only appears in one year, then set it as start and end date and skip loop
        if len(filtered_years) == 1:
            year_ranges.append([filtered_years[0], filtered_years[0]])

        # If the subject appears in more than one year, start loop
        else:
            # current range is a list of the current successive range of years that a subject occurs
            current_range = [filtered_years[0]]

            for i in range(1, len(filtered_years)):
                # If the current year is consecutive to the previous year,
                # extend the range and continue
                if filtered_years[i] == filtered_years[i - 1] + 1:
                    current_range.append(filtered_years[i])
                # Else, stop the current range and append it. Two scenarios:
                else:
                    # If the subject appears in a standalone year,
                    # set that year as the start and end date
                    if len(current_range) == 1:
                        current_range.append(current_range[0])
                    # Otherwise, close the current consecutive range and start a new one
                    year_ranges.append(current_range)
                    current_range = [filtered_years[i]]

            # If the subject ends on a standalone year, set that year as the start and end date
            if len(current_range) == 1:
                current_range.append(current_range[0])

            # Add the last range to the list
            if current_range:
                year_ranges.append(current_range)
        sub_dict[subject] = year_ranges
    return sub_dict

    


    # The headers for the timeline
def create_timelines(sub_dict, output, umbs, json_categories):
    category_list = {key: value[0] for key, value in json_categories.items()}
    csv_lines = []

    for subject in sub_dict:

        # Creates a new line in the csv for each time range entry
        for year_range in sub_dict[subject]:
            if (year_range[0] == year_range[1]):

                count = df.loc[(df['year'] == year_range[0]) & (df['subjects'] == subject), 'count'].values[0]

            else:
                count = 0
                for year in year_range:
                    count += df.loc[(df['year'] == year) & (df['subjects'] == subject), 'count'].values[0]

            if subject in umbs:
                new_line = ["Topic, " + subject, "Topic, " + subject, str(min(year_range)) + "-01-02",
                            str(max(year_range)) + "-12-31", count]
            else:
                new_line = [subject, subject, str(min(year_range)) + "-01-02", str(max(year_range)) + "-12-31", count]
            csv_lines.append(new_line)


    
    # Gets a dict of topic : umbrella
    for subject, year_ranges in sub_dict.items():
        for year_range in year_ranges:
            if subject in umbs:
                new_line = ["Topic, "+subject, "Topic, "+subject, str(min(year_range)) + "-01-02", str(max(year_range)) + "-12-31",count]
            else:
                new_line = [subject, subject, str(min(year_range)) + "-01-02", str(max(year_range)) + "-12-31",count]
            csv_lines.append(new_line)

    # print(csv_lines)
    # Removes headers and gets list of categories
    categories = list(set(list(category_list.values())))
    newlines = [["Role", "Name", "Start", "End","Count"]]

    # Adds a header row for each category, followed by the relevant topics
    for cat in categories:
        incat = [[" • " + cat + " • "]]

        for line in csv_lines:
        # If the current category in the csv is under the umbrella cat we are looping on, then add the line to the umbrella and topics list of lists
            if category_list[line[1].replace("Topic, ","")] == cat:
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


                if entry[1] != "Uncategorized":
                    tops = (umbrellas[entry[1]])


                    years = list(range(int(entry[2][:4]), int(entry[3][:4])+1))

                    count = 0

                    for top in tops:
                        for year in years:

                            matching = (df.loc[(df['year'] == year) & (df['subjects'] == top), 'count'].values)


                            if len(matching) > 0:
                                count += df.loc[(df['year'] == year) & (df['subjects'] == top), 'count'].values[0]

                else:
                    count = 0


                new_entry = entry

                new_entry.append(count)


                incat.append(new_entry)

    with open(output, 'w', newline='') as f:
        print('Successfully wrote to: ' + output)
        writer = csv.writer(f)
        writer.writerows(newlines)

def getcolors(datafile, output, colors, umbs, json_categories):
        wr.writerow(colors_list)

def timeline_data_creation(args):
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
    
    with open(args['umbrella_file'], 'r') as file:
        umbs = json.load(file)
    umbs = list(umbs.keys())
    with open(args['topic_category_file'], 'r') as file:
        json_categories = json.load(file)
    # Right now, just taking the first umbrella for a certain topic
    sub_dict = create_sub_dict(args['input'])
    create_timelines(sub_dict, args['output'], umbs, json_categories)
    getcolors(args['output'], args['color_file'], colors, umbs, json_categories)

def main():
    parser = argparse.ArgumentParser(description="Generate timeline data and colors.")
    parser.add_argument('input', type=str, help='Input CSV file with subjects and years.')
    parser.add_argument('output', type=str, help='Output CSV file for timeline data.')
    parser.add_argument('colorfile', type=str, help='Output CSV file for color mapping.')
    parser.add_argument('umbrella_file', type=str, help='Input CSV file for the umbrella file.')
    parser.add_argument('topic_category_file', type=str, help='Input CSV file for the topiccategory file.')
    args = parser.parse_args()
    timeline_data_creation(vars(args))
    # gets umbrellas list
    

if __name__ == "__main__":
    main()


#createTimelineData("1779_1848.csv", "sortedtimeline.csv")

#createTimelineData("rbt_subjects.csv", "sortedtimeline.csv")

#createTimelineData("cmsol_subjects.csv", "sortedtimeline.csv")

#timelineFunc("rbt_subjects.csv", "sortedtimeline.csv","sortedcolors.csv")
