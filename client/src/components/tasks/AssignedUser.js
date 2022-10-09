export const AssignedUser = ({ membersOnly, checked }) => {
  const filterMember = membersOnly?.map((m) => {
    let name;

    for (let [key, value] of Object.entries(checked)) {
      if (value && key === m.id) {
        name = m.name;
      }
    }
    if (name) return name;

    return null;
  });
  const removeNull = filterMember.filter((e) => e !== null);
  const assigned_to = removeNull.join(', ');

  return assigned_to;
};
