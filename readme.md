## Getting Started

First, run the development server:

```bash
npm install type-hindi

#or
npm i type-hindi

```

Import typeHindi from type-hindi

```bash


import typeHindi from "type-hindi";


```

Apply this Method to onKeyDown event

```bash
# typeHindi use this method to type hindi

function App() {
  return (
    <>
      <div>

        <input type="text" onKeyDown={(e) => typeHindi(e)} />
      </div>
    </>
  );
}


#  all Done 🚀

```
