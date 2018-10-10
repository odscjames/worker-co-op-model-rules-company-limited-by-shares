


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

        if (this._is_node_title(node)) {

            this._process_body_node_title(node);


        }
    }

    _is_node_title(node) {
        var foundTitle = false;
        for (var i = 0; i < node.childNodes.length; i++) {
          var childNode = node.childNodes[i];
          if(childNode.nodeType !== Node.TEXT_NODE) {
            if(childNode.localName != 'title') {
                return false
            } else if(childNode.localName == 'title') {
                foundTitle = true;
            }

          }
        }
        return foundTitle;
    }

    _process_body_node_title(node) {
        this.out_body += '<h3>' + node.textContent.trim() + '</h3>';
    }

    get() {

        return this.out_body;


    }

}



