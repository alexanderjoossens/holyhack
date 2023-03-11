class Vector extends Array {
    // example methods
    add(other) {
      return this.map((e, i) => e + other[i]);
    }
  }
  
  // example usage
  let v = new Vector(1, 2, 3);
  console.log(v.add(v));