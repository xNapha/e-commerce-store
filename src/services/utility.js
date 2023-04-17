export const itemUrlPath = (title) => {
    return title
        .replace(/[\W]/gi, " ")
        .split(" ")
        .filter((string) => string)
        .join("+")
        .toLowerCase();
};
