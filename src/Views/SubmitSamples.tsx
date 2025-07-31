import { useState } from "react";
import Input from "../Components/Input/Input";
import { foodTestDropdownOptions } from "../mockData/typeofTest";
import SelectComponent from "../Components/Select/Select";
import CheckboxGroup from "../Components/Checkbox/CheckboxGroup";
import TextArea from "../Components/Textarea/Textarea";

export default function SubmitSamples({ user }: any) {
  const initialFormData = {
    sampleName: '',
    sampleOwner: user,
    sampleType: '',
    testType: '',
    teamName: '',
    totalSamples: '',
    testingSheet: null,
    testDuration: '',
    startDate: new Date().toLocaleDateString(),
    notes: '',
    sampleConditions: [] as string[],
  };
  const [formData, setFormData] = useState(initialFormData);

  const sampleConditions = ['Frozen', '25C', '20C', '40C', '35C', 'All of the above'];
  const testDuration = [
    { label: '2-week', value: '2-week' },
    { label: '4-week', value: '4-week' },
    { label: '8-week', value: '8-week' },
    { label: '12-week', value: '12-week' },
    { label: '6 months', value: '6-months' },
    { label: '1 year', value: '1-year' }
  ];


  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);

    // Reset form
    setFormData({
      ...initialFormData,
      sampleOwner: user,
      startDate: new Date().toLocaleDateString()
    });
  };

  return (
    <div className='ml-4'>
      <h1 className='text-3xl'>Submit your samples here</h1>
      <p>You are currently logged in as {user}. If this is not you, please log out and log in to your account.</p>

      <div className='mt-4'>
        <p>Please read the following guidelines when submitting samples:</p>
        <ol className='list-decimal list-inside'>
          <li>All samples must be labeled properly before submission.</li>
          <li>Please submit a paper copy of your testing sheet and upload your sheet so we have a copy of your data.</li>
          <li>Testing will not begin unless all required documents and items have been received. Please account for this on your testing sheets.</li>
          <li>Once all required items have been received, you will receive a notification from the lab tech who picks up your samples.</li>
        </ol>
      </div>

      <p className='text-lg my-4'>To submit your samples, please fill out the form below:</p>

      <form
        className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4"
        onSubmit={handleSubmit}
      >
        <Input
          label="Sample Name"
          type="text"
          placeholder="Enter sample name"
          value={formData.sampleName}
          onChange={(e) => setFormData({ ...formData, sampleName: e.target.value })}
          name="sampleName"
        />

        <Input
          label="Sample Owner"
          type="text"
          placeholder=""
          value={formData.sampleOwner}
          onChange={() => {}}
          name="sampleOwner"
          disabled={true}
        />

        <Input
          label="Team Name"
          type="text"
          placeholder="Enter team name"
          value={formData.teamName}
          onChange={(e) => setFormData({ ...formData, teamName: e.target.value })}
          name="teamName"
        />

        <Input
          label="Start Date"
          type="text"
          placeholder="MM/DD/YYYY"
          value={formData.startDate}
          onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
          name="startDate"
        />

        <CheckboxGroup
          options={sampleConditions}
          onChange={(selected) =>
            setFormData({ ...formData, sampleConditions: selected })
          }
        />

        <SelectComponent
          label="Type of test"
          options={foodTestDropdownOptions}
          value={formData.testType}
          onChange={(e) => setFormData({ ...formData, testType: e.target.value })}
          name="testType"
        />

        <SelectComponent
          label="Test Duration"
          options={testDuration}
          value={formData.testDuration}
          onChange={(e) => setFormData({ ...formData, testDuration: e.target.value })}
          name="testDuration"
        />

        <TextArea
          label="Other notes, please write in specifications here"
          name="notes"
          value={formData.notes}
          onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
        />

        <div className="col-span-full">
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
          >
            Submit Samples
          </button>
        </div>
      </form>
    </div>
  );
}