


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
            if(node.localName == 'title') {
                this._process_title(node);
            } else if (node.localName == 'subtitle') {
                this._process_subtitle(node);
            } else if (node.localName == 'body') {
                this._process_body(node);
            }
          }
        }





    }

    _process_title(node) {
    }

    _process_subtitle(node) {
    }

    _process_body(node) {



        for (var i = 0; i < node.childNodes.length; i++) {
          var childNode = node.childNodes[i];
          if(childNode.nodeType !== Node.TEXT_NODE) {
            this._process_body_node(childNode);
          }
        }

    }

    _process_body_node(node) {
        console.log(node)
    }

    get() {




    }

}



