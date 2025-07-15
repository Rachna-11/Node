const express = require("express");
const app = express();
const port = 3000;

app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs");

let todos = [];

app.get("/", (req, res) => {
    res.render("index", { todos });
});

app.post("/add", (req, res) => {
    const { task } = req.body;
    if (task.trim()) {
        todos.push(task);
    }
    res.redirect("/");
});

app.get("/edit/:index", (req, res) => {
    const index = req.params.index;
    const task = todos[index];
    res.render("edit", { task, index });
});

app.post("/edit/:index", (req, res) => {
    const index = req.params.index;
    const { task } = req.body;
    todos[index] = task;
    res.redirect("/");
});

app.post("/delete/:index", (req, res) => {
    const index = req.params.index;
    todos.splice(index, 1);
    res.redirect("/");
});
app.post("/delete-all", (req, res) => {
  todos = [];
  res.redirect("/");
});


app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
