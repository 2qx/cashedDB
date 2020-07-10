var Console = /** @class */ (function () {
    function Console() {
        this.error = function (txt) {
            this.log(txt, "ERROR!");
        };
        this.textarea = document.createElement('textarea');
    }
    Console.prototype.log = function (txt, type) {
        if (type)
            this.textarea.value += type + " ";
        this.textarea.value += txt + "\n";
    };
    return Console;
}());
export default Console;
//# sourceMappingURL=console.js.map