async function fetchUserData() {
    try {
        const data = await fetch('https://dummyjson.com/users');
        const users = await data.json();
        return users.users;
    } catch (error) {
        console.error('Error fetching:', error);
        throw error;
    }
}

async function processUserData() {
    try {
        const users = await fetchUserData();
        const males = users.filter(user => user.gender == 'male');
        const mapped = males.map(user => `Name: ${user.firstName} ${user.lastName}, Age: ${user.age}`);
           console.log(mapped);
           

    } catch (error) {
        console.error('Error:', error);
    }
}
async function summarizeAge(){
     const users = await fetchUserData();
     const males = users.filter(user => user.gender == 'male');
     const totalAges = males.reduce((total, user) => total + (user.age) , 0);
        console.log('Total age :', totalAges);

}
processUserData();
summarizeAge();