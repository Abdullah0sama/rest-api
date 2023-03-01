export const userSeedData = () => {
  const users = [
    {
      email: 'dui.in@yahoo.edu',
      name: 'Boris Ayers',
      city: 'Los Angeles',
      state: 'California',
    },
    {
      email: 'enim@aol.ca',
      name: 'Cherokee Frazier',
      city: 'Houston',
      state: 'Texas',
    },
    {
      email: 'diam@aol.com',
      name: 'Wayne Stephenson',
      city: 'New York',
      state: 'New York',
    },
    {
      email: 'sed.eu.eros@icloud.edu',
      name: 'Yen Bell',
      city: 'Chicago',
      state: 'Illinois',
    },
    {
      email: 'molestie.sodales@icloud.couk',
      name: 'Kimberley Harvey',
      city: 'San Diego',
      state: 'California',
    },
  ];

  // 123456678
  const password =
    '$2b$12$31NtkkE2hHssK2NN49BhoOj.STtqz7Bz4ujuTuiu4e2EG1SC6xvBG';
  return users.map((user) => ({ ...user, password }));
};
