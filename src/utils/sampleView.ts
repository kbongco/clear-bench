  export const getStatusColor = (status:string) => {
    switch (status.toLowerCase()) {
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'in progress':
        return 'bg-yellow-100 text-yellow-800';
      case 'pending':
        return 'bg-gray-100 text-gray-800';
      case 'failed':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  export const getBottleTestStats = (bottleKey) => {
    const tests = Object.values(bottles[bottleKey].tests);
    const completed = tests.filter(t => t.status.toLowerCase() === 'completed').length;
    return { completed, total: tests.length };
  };