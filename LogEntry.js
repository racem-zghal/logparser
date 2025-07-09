export class LogEntry{
    constructor({timestamp , level , module, message }){
        this.timestamp=timestamp;
        this.level=level;
        this.module=module;
        this.message=message;
        this.isError= level=="Error";
        this.isWarning= level=="Warning";
    }
    highlight() {
        // marquer comme surligné
    }

    fold() {
        //  plier la ligne
    }

    expand() {
        // déplier la ligne
    }

}