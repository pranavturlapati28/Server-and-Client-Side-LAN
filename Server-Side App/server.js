const http = require('http');
const fs = require('fs');
const { exec } = require('child_process');

const server = http.createServer((req, res) => {
  if (req.method === 'POST' && req.url === '/data') {
    let body = '';

    req.on('data', (chunk) => {
      body += chunk;
    });

    req.on('end', () => {
      // Process the received data
      const data = body.toString();

      // Extract the address, money, and address values
      const [senderAddress, money, receiverAddress] = data.split('-');

      // Get the current date and time
      const timestamp = new Date().toString();

      // Format the data with the extracted values and the timestamp
      const formattedData = `Timestamp: ${timestamp}\nSender Address: ${senderAddress}\nMoney: ${money}\nReceiver Address: ${receiverAddress}`;

      // Append the data to the text file
      fs.appendFile('data.txt', formattedData + '\n', (err) => {
        if (err) {
          console.error('Error appending to file:', err);
          res.statusCode = 500;
          res.end('Error appending to file');
        } else {
          console.log('Data appended to file successfully');

          // Execute the Java program with the data as a command-line argument
          exec(`java serv.Main "${data}"`, (error, stdout, stderr) => {
            if (error) {
              console.error('Error executing Java program:', error);
              res.statusCode = 500;
              res.end('Error processing data');
            } else {
              console.log('Java program output:', stdout);
              res.statusCode = 200;
              res.end('Data processed by Java');
            }
          });
        }
      });
    });
  } else {
    res.statusCode = 404;
    res.end('Not found');
  }
});

const port = 3000;
server.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
