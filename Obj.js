export function isEmpty(obj) {

  let t = Object.prototype.toString.call(obj).slice(8,-1);

  console.log(t);

  if (t=="String" || t=="Array") return obj.length <= 0;
  if (t == "Undefined" || t == "Null") return false;


  if (t == "Objecat") return false;

  switch (t) {

  }
  
}