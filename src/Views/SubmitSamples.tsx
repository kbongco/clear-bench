import { useState } from "react";
import Input from "../Components/Input/Input";
import { ALL_CONDITIONS, foodTestDropdownOptions, realValues, storageConditions, typeOfSample } from "../constants/formOptions";
import SelectComponent from "../Components/Select/Select";
import CheckboxGroup from "../Components/Checkbox/CheckboxGroup";
import TextArea from "../Components/Textarea/Textarea";
import { createSample } from "../services/samples";
import Toast from "../Components/Toast/Toast";
import type { NewSample, ScientistSummary, TestDuration } from "../types/Samples/sample";
import formatDate from "../utils/formatDate";
import { applyAllOption } from "../utils/applyAll";
import { CURRENT_SCIENTIST_ID } from "../services/currentUser";

export default function SubmitSamples({ scientist }: { scientist: ScientistSummary }) {
  const today = new Date();
  const formattedToday = formatDate(today);
  const initialFormData = {
    sampleName: '',
    sampleOwner: scientist.name,
    testTypes: [] as string[],
    sampleType: '',
    totalSamples: '',
    testingSheet: null,
    testDuration: '' as TestDuration,
    startDate: formattedToday,
    notes: '',
    sampleConditions: [] as string[],
  };
  const [formData, setFormData] = useState(initialFormData);
  const [toast, setToast] = useState<{ message: string; type: "success" | "error" | "info" } | null>(null);

  const testDuration = [
    { label: '2-week', value: '2-week' },
    { label: '4-week', value: '4-week' },
    { label: '8-week', value: '8-week' },
    { label: '12-week', value: '12-week' },
    { label: '6 months', value: '6-months' },
    { label: '1 year', value: '1-year' }
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const payload: NewSample = {
        name: formData.sampleName,
        scientist_id: CURRENT_SCIENTIST_ID,
        sample_type: formData.sampleType,
        totalBottles: parseInt(formData.totalSamples, 10) || 1,
        test_types: formData.testTypes,
        test_duration: formData.testDuration,
        test_start: formData.startDate,
        notes: formData.notes,
        temperature: formData.sampleConditions.filter((value) => value !== ALL_CONDITIONS),
      }
      await createSample(payload);
      setFormData({
        ...initialFormData,
        sampleOwner: scientist.name,
        startDate: new Date().toLocaleDateString()
      });
      setToast({ message: "Sample has been submitted! successfully", type:'success' });
    } catch {
      setToast({ message: 'Failed to submit sample, you are missing some stuff', type:'error' });

    }
  }

  return (
    <div className='ml-4'>
      <h1 className='text-3xl'>Submit your samples here</h1>
      <p>You are currently logged in as {scientist.name}. If this is not you, please log out and log in to your account.</p>

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
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}
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
          onChange={() => { }}
          name="sampleOwner"
          disabled={true}
        />

        <Input
          label="Team Name"
          type="text"
          value={scientist.department ?? ""}
          onChange={() => { }}
          name="teamName"
          disabled={true}
        />

        <Input
          label='Total Number of Samples'
          type="number"
          placeholder=""
          value={formData.totalSamples}
          onChange={(e) => setFormData({ ...formData, totalSamples: e.target.value })}
          name="totalSamples" />

        <Input
          label="Start Date"
          type="date"
          value={formData.startDate}
          onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
          name="startDate"
        />

        <CheckboxGroup
          labelTitle='Sample Conditions'
          options={storageConditions}
          selected={formData.sampleConditions}
onChange={(next) =>
  setFormData({
    ...formData,
    sampleConditions: applyAllOption(formData.sampleConditions, next, realValues),
  })
}
        />

<CheckboxGroup
  labelTitle="Tests to run"
  options={foodTestDropdownOptions}
  selected={formData.testTypes}
  onChange={(updated) => setFormData({ ...formData, testTypes: updated })}
/>

        <SelectComponent
          label="Test Duration"
          options={testDuration}
          value={formData.testDuration}
          placeholder="Select test duration"
          onChange={(e) => setFormData({ ...formData, testDuration: e.target.value })}
          name="testDuration"
        />
                <SelectComponent
          label="Type of Sample"
          placeholder="Select a sample type"
          options={typeOfSample}
          value={formData.sampleType}
          onChange={(e) => setFormData({ ...formData, sampleType: e.target.value })}
          name="sampleType"
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