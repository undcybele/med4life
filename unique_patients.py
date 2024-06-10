import json
def filter_duplicates(data):
    unique_objects = {}
    for obj in data:
        name = obj['person_details']['name']
        unique_objects[name] = obj
    return list(unique_objects.values())

input_file = 'simulated_transformed_data.json'
with open(input_file, 'r') as f:
    data = json.load(f)

filtered_data = filter_duplicates(data)

output_file = 'unique_patients.json'
with open(output_file, 'w') as f:
    json.dump(filtered_data, f, indent=4)
print("Filtered data has been written to:", output_file)
