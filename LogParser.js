import { LogEntry } from "./LogEntry.js";
import { ProblemPattern } from "./ProblemPattern.js";
import { ParsingRule } from "./ParsingRule.js";

export class LogParser{
    constructor(){
        this.parsingRules=[new ParsingRule("Detailed Log Line", /^\[(.*?)\]\s+\[(.*?)\]\s+\[(.*?)\]\s+(.*)/,
                "#FF0000")];
        this.problemPatterns=[];
    }
    parse(rawText){
        const lines = rawText.split(/\r?\n/);
        const entries=[];
        for (const line of lines){
            let matched = false;
            for ( const rule of this.parsingRules){
                const match = line.match(rule.regex);
                if (match){
                    const level = match[2];
                    entries.push(new LogEntry({timestamp: match[1], level: this.mapLevel(level), module: match[3] ,message: match[4]}));
                    matched=true;
                    break;
                }
            }
            if (!matched && line.trim()){
                entries.push(
                    new LogEntry({timestamp: "", level: "INFO", message: line}));

            }
        }
        return entries;
    }
    detectPatterns(entries){
        return[];
    }
    mapLevel(level) {
        switch (level.toUpperCase()) {
            case "ERR":
                return "ERROR";
            case "INF":
                return "INFO";
            case "WRN":
                return "WARNING";
            case "DBG":
                return "DEBUG";
            default:
                return level;
        }
    }
}
