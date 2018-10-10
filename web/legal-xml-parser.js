


class LegalXMLParser {
    constructor(data) {
        this.data = data;

        this.out_title = "";
        this.out_subtitle = "";
        this.out_body = "";

        var oParser = new DOMParser();
        var oDOM = oParser.parseFromString(data, "application/xml");

        for (var i = 0; i < oDOM.firstChild.childNodes.length; i++) {
          var node = oDOM.firstChild.childNodes[i];
          if(node.nodeType !== Node.TEXT_NODE) {
            console.log(node);
          }
        }




    }

    get() {




    }

}



