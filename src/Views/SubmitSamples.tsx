import { useState } from "react";
import Input from "../Components/Input/Input";
import Checkbox from "../Components/Checkbox/Checkbox";
import { foodTestDropdownOptions } from "../mockData/typeofTest";
import SelectComponent from "../Components/Select/Select";
import CheckboxGroup from "../Components/Checkbox/CheckboxGroup";

export default function SubmitSamples({ user }: any) {
  console.log(user);
  const [formData, setFormData] = useState({
    sampleName: '',
    sampleOwner: user,
    sampleType: '',
    teamName: '',
    totalSamples: '',
    testingSheet: null
  });

  const sampleConditions = ['Frozen', '25C', '20C', '40C', '35C']


  return (
    <>
      <div className='ml-4'>
        <h1 className='text-3xl'>Submit your samples here</h1>
        <p>You are currently logged in as {user}, if this is not you, please log out and log in to your account</p>
        <div className='mt-4'>
          <p>Please read the following guidelines when submitting samples</p>
          <ol>
            <li>All samples must be labeled properly before submission</li>
            <li>Please submit a paper copy of your testing sheet and upload your sheet so we have a copy of your data</li>
            <li>Testing will not begin unless all required documents and items have been recieved, please account for this on your testing sheets</li>
            <li>Once all required items have been recieved, you will recieve a notification from the lab tech who picks up your samples</li>
          </ol>
        </div>
        <p className='text-lg my-4'>To submit your samples, please fill out the form below</p>
        <div>
          <div>
            <form className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
              <div>
                <Input
                  label="Sample Name"
                  type="text"
                  placeholder="Enter sample name"
                  value={formData.sampleName}
                  onChange={(e) => setFormData({ ...formData, sampleName: e.target.value })}
                  name="sampleName"
                />
              </div>

              <div>
                <Input
                  label="Sample Owner"
                  type="text"
                  placeholder=""
                  value={formData.sampleOwner}
                  onChange={() => { }}
                  name="sampleOwner"
                  disabled={true}
                />
              </div>

              <div>
                <Input
                  label="Team Name"
                  type="text"
                  placeholder="Enter team name"
                  value={formData.teamName}
                  onChange={(e) => setFormData({ ...formData, teamName: e.target.value })}
                  name="teamName"
                />
              </div>

              <div>
                <CheckboxGroup
                  options={sampleConditions}
                  onChange={(selected) => console.log('Selected tests:', selected)}
                />
              </div>

              <div>
                <SelectComponent
                  label="Type of test"
                  options={foodTestDropdownOptions}
                  value={formData.testType}
                  onChange={(e) => setFormData({ ...formData, testType: e.target.value })}
                  name="testType"
                />
              </div>

              <div>
                <Input
                  label="Additional Notes"
                  type="text"
                  placeholder="Optional"
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  name="notes"
                />
              </div>

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

        </div>

      </div>
    </>
  )
}