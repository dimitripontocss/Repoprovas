import app from "./index.js";

app.listen(process.env.PORT, () => {
    console.log(`Server on! na porta ${process.env.PORT}`);
});