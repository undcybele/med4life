import json

def transform_data(input_filename, output_filename):
    with open(input_filename, 'r') as file:
        data = json.load(file)

    patient_data_array = list(data.values())

    with open(output_filename, 'w') as output_file:
        json.dump(patient_data_array, output_file, indent=2)

if __name__ == "__main__":
    input_file = input("Enter the input filename: ")
    output_file = input("Enter the output filename: ")

    transform_data(input_file, output_file)
    print(f"Transformation complete. Check {output_file} for the result.")