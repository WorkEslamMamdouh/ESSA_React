function FilterText(str, settings) {
    let result = str;
    if (settings.IsSensitive)
        result = FilterTextFunctions.SensitiveText(str);
    if (settings.IsNumeric)
        result = FilterTextFunctions.ToNumeric(result);
    return result.trim();
}
class FilterTextSettings {
}
class FilterTextFunctions {
    /**
     * Clear arabic text and extend characters
     * @param str
     */
    static SensitiveText(str) {
        str = str.trim();
        str = str.replace('أ', 'ا');
        str = str.replace('آ', 'ا');
        str = str.replace('إ', 'ا');
        str = str.replace('ة', 'ه');
        str = this.RemoveExtend(str);
        let names = new Array(); //[] names = str.Split(' ');
        names = str.split(' ');
        str = "";
        for (let i = 0; i < names.length; i++) {
            names[i] = names[i].trim();
            if (names[i].length > 0)
                str += " " + names[i].trim();
        }
        str = str.replace("عبد ", "عبد");
        str = str.replace("ابو ", "ابو");
        return str.trim();
    }
    static RemoveExtend(str) {
        let result = "";
        for (let i = 0; i < str.length; i++) {
            let char = str[i];
            if (char == 'ـ')
                char = '';
            result += char;
        }
        return result;
    }
    /**
     * Remove a non numeric characters
     * @param str
     */
    static ToNumeric(str) {
        let result = "";
        for (let i = 0; i < str.length; i++) {
            let char = str[i];
            let value = Number(char);
            if (isNaN(value) == true)
                char = "";
            result += char;
        }
        return result;
    }
}
//# sourceMappingURL=ClientGeneralTools.js.map