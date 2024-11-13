import pandas as pd
import csv
import json
from datetime import datetime
from pathlib import Path

master_folder = Path(__file__).parent.parent.parent.parent


# Function to parse date strings
def parse_date(date_str):
    return datetime.strptime(date_str, '%Y-%m-%d')


# Function to get the union of date ranges
def get_union_of_date_ranges(data):
    date_ranges = []

    for row in data:
        if len(row) == 5:  # Only process rows with date ranges
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
        if start <= current_end:  # Overlapping or consecutive ranges
            current_end = max(current_end, end)
        else:
            merged_ranges.append((current_start, current_end))
            current_start, current_end = start, end

    merged_ranges.append((current_start, current_end))

    return merged_ranges


# Function to return the union of date ranges in the requested structure, following the exact format
def format_union_of_date_ranges(data, header):
    title = header.replace(" • ", "").strip()
    union_ranges = get_union_of_date_ranges(data)

    # Prepare the output list where each range gets its own entry, following the format
    formatted_output = []
    for start, end in union_ranges:
        formatted_output.append([header, title, str(start.date()), str(end.date())])

    return formatted_output


# gets umbrellas list
with open(master_folder / "data" / "timeline" / 'umbrellas.json', 'r') as file:
    umbrellas = json.load(file)

umbs = list(umbrellas.keys())

# Gets a dict of topic : umbrella
with open(master_folder / "data" / "timeline" / 'topiccategories.json', 'r') as file:
    d = json.load(file)

# Right now, just taking the first umbrella for a certain topic
Category_list = {key: value[0] for key, value in d.items()}



def createTimelineData(filepath, output, collection):
    """

    Args:

        filepath: (str) csv file of data
        output: (str) csv filename to output

    Returns:

    """
    # Subject : Year Ranges
    sub_dict = {}

    df = pd.read_csv(master_folder / "data" / "timeline" / "Raw Data" / filepath, sep=",")

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
    csv_lines = [["Role", "Name", "Start", "End", "Count"]]

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

    # Removes headers and gets list of categories
    csv_lines.pop(0)
    categories = list(set(list(Category_list.values())))
    newlines = [["Role", "Name", "Start", "End", "Count"]]

    # Adds a header row for each category, followed by the relevant topics
    for cate in categories:
        incat = [[" • " + cate + " • "]]


        for line in range(len(csv_lines)):

            if Category_list[csv_lines[line][1].replace("Topic, ", "")] == cate:

                incat.append(csv_lines[line])


        # A len of one means this is an umbrella with no entries (other than the header column)
        if len(incat) > 1:

            all = incat[:]
            cat = all.pop(0)

            catlines = []
            for each in all:

                new = [cat[0], each[1], each[2], each[3],0]

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

            catlines.extend(incat)

            newlines.extend(catlines)


    with open(master_folder / "data" / collection / "timeline" / output, 'w', newline='') as f:
        print('Successfully wrote to: ' + output)
        writer = csv.writer(f)
        writer.writerows(newlines)


createTimelineData("1779_1848.csv", "sortedtimeline.csv", "jqa")

createTimelineData("rbt_subjects.csv", "sortedtimeline.csv", "rbt")

createTimelineData("cmsol_subjects.csv", "sortedtimeline.csv", "cmsol")
