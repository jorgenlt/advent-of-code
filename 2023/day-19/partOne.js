import fs from "fs/promises";

const test = `
px{a<2006:qkq,m>2090:A,rfg}
pv{a>1716:R,A}
lnx{m>1548:A,A}
rfg{s<537:gd,x>2440:R,A}
qs{s>3448:A,lnx}
qkq{x<1416:A,crn}
crn{x>2662:A,R}
in{s<1351:px,qqz}
qqz{s>2770:qs,m<1801:hdj,R}
gd{a>3333:R,R}
hdj{m>838:A,pv}

{x=787,m=2655,a=1222,s=2876}
{x=1679,m=44,a=2067,s=496}
{x=2036,m=264,a=79,s=2244}
{x=2461,m=1339,a=466,s=291}
{x=2127,m=1623,a=2188,s=1013}
`

const isAccepted = (part, workflow, workflows) => {
  console.log("workflow = ", workflow);
  const conditions = workflows[workflow];
  console.log("🚀 ~ isAccepted ~ conditions:", conditions);

  if (workflow === "A") return true;
  if (workflow === "R") return false;

  for (let i = 0; i < conditions.length; i++) {
    const condition = conditions[i];

    if (condition[1] === "<" || condition[1] === ">") {
      const category = condition[0];
      const value = parseInt(condition.match(/\d+/g));
      const action = condition.split(":").at(-1);
      console.log("🚀 ~ isAccepted ~ action:", action)

      // if checking for Less Than
      if (condition[1] === "<") {
        // if statement is true, move on with action.
        // else Continue loop
        if (part[category] < value) {
          console.log("######")
          console.log("isAccepted(part, action, workflows)", "=>", "isAccepted(", part, action, workflows, ")")
          console.log("######")
          return isAccepted(part, action, workflows);
        } else {
          continue;
        }
      
      // if checking for Greater Than
      } else if (condition[1] === ">") {
        // if statement is true, move on with action
        // else continue to next step
        if (part[category] > value) {
          return isAccepted(part, action, workflows);
        } else {
          continue;
        }
      }
    }

    continue
  }

  console.log("no conditions match");
  return null;
};

const main = async () => {
  const input = (await fs.readFile("test.txt", "utf8")).trim().split("\n\n");
  // const input = test.trim().split("\n\n");
  // const workflows = input[0].split("\n");

  // Creating an object with workflows and their conditions
  // {
  //   name: conditions
  // }
  //
  // {
  //   px: [ 'a<2006:qkq', 'm>2090:A', 'rfg' ],
  //   pv: [ 'a>1716:R', 'A' ],
  // }
  let workflows = {};

  input[0].split("\n").forEach((e) => {
    const name = e.split("{")[0];
    const conditions = e
      .split("{")[1]
      .split(",")
      .map((c) => c.replace("}", ""));
    // console.log(conditions)
    // console.log(name)

    workflows[name] = conditions;
  });

  // Creating an array of parts with their properties
  // parts:  [
  //   { x: 653, m: 2123, a: 2908, s: 577 },
  //   { x: 716, m: 172, a: 813, s: 2294 },
  //   { x: 417, m: 2371, a: 1280, s: 962 },
  //   { x: 1465, m: 1705, a: 1990, s: 994 },

  const parts = [];

  input[1]
    .split("\n")
    .map((e) => e.replace(/[{]|[}]/g, "").split(","))
    .forEach((part) => {
      // console.log(part)

      const x = parseInt(part[0].match(/\d+/)[0]);
      const m = parseInt(part[1].match(/\d+/)[0]);
      const a = parseInt(part[2].match(/\d+/)[0]);
      const s = parseInt(part[3].match(/\d+/)[0]);

      parts.push({ x, m, a, s });
    });

  const initialWorkflow = "in";
  
  let sumAccepted = 0;

  parts.forEach((part) => {
    console.log("---");
    console.log("checking part: ", part)
    console.log(
      "isAccepted(part, in, workflows): ",
      isAccepted(part, "in", workflows)
    );
    console.log("---");
    if (isAccepted(part, initialWorkflow, workflows)) {
      sumAccepted += part.x + part.m + part.a + part.s;
    }
    // console.log(part)
  });

  console.log(sumAccepted);
};

main();
