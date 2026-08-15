const fs = require('fs');
fetch('http://localhost:3001/api/profile', {
  method: 'PUT',
  body: new URLSearchParams({ name: 'Abinet' })
}).then(res => res.json()).then(console.log).catch(console.error);
