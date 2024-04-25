const express = require("express");
const app = express();
const cors = require("cors");
const { createTables, deleteTables } = require("./util/createTables");

const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const childrenRoutes = require("./routes/childrenRoutes");
const shopRoutes = require("./routes/shopRoutes");

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// deleteTables();
// createTables();
app.use("/auth", authRoutes);
app.use("/user", userRoutes);
app.use("/children", childrenRoutes);
app.use("/shop", shopRoutes);

const port = 5000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
