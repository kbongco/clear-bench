import Table from "../../Components/Table/Table";

export default function ViewAllSamples({ user, data }: any) {
  const tableTitle = 'Your teams samples'
  const currentSamplesArr = data.map(sample => {
    return {
      id: sample.id,
      name: sample.name,
      owner: sample.owner.name,
      totalSamples: sample.totalSamples,
      typeOfTest: sample.typeOfTest,
      testStatus: sample.testStatus,
      dueDate: sample.dueDate
    }
  });

  console.log(data);
  return (
    <>
      <h1>View All Samples</h1>
      <Table tableTitle={tableTitle} tableHeader={Object.keys(currentSamplesArr[0])} data={currentSamplesArr} />
    </>
  )
}