export const buildTree = (flatData) => {
  const idToNodeMap = new Map();
  const roots = [];
  
  // First pass: Create all nodes
  flatData.forEach(person => {
    idToNodeMap.set(person.id, {
      ...person,
      children: []
    });
  });
  
  // Second pass: Build parent-child relationships
  flatData.forEach(person => {
    const node = idToNodeMap.get(person.id);
    
    if (person.manager_id === null) {
      roots.push(node);
    } else {
      const parent = idToNodeMap.get(person.manager_id);
      if (parent) {
        parent.children.push(node);
      }
    }
  });
  
  return { nodes: idToNodeMap, roots };
};