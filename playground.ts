function getTimeout(seconds: number): number {
  return seconds * 1000;  
}

const config = { baseURL: "https://staging.example.com" };
console.log(config.baseURL);

function printName(name: string) {
  console.log(name);
}

const userName: string | undefined = undefined;


if (userName) {
  printName(userName);  
}
