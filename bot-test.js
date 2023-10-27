// small sample script to test behaviour
run()

async function makePost(route, body) {
  const res = await fetch('http://localhost:3111' + route, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json', // Set the appropriate content type for your data
    },
    body: JSON.stringify(body), // Convert the data to a JSON string
  })
  return await res.json()
}

async function run() {
  const res = await makePost('/register', {
    name: 'test',
    password: '1234',
  })
  console.log(res)
}
