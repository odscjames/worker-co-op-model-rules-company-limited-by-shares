


class LegalXMLParser {
    constructor(data) {
        this.data = data;

        this.out_title = "";
        this.out_subtitle = "";
        this.out_body = "";

        var oParser = new DOMParser();
        var oDOM = oParser.parseFromString(data, "application/xml");

        this.marker_stack =  [
            {
                'type': 'number',
                'next': 1
            }
        ];

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
        } else if(this._is_node_block(node)) {
            this._process_body_node_block(node);
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

    _is_node_block(node) {
        var foundBlock = false;
        for (var i = 0; i < node.childNodes.length; i++) {
          var childNode = node.childNodes[i];
          if(childNode.nodeType !== Node.TEXT_NODE) {
            if(childNode.localName != 'block') {
                return false
            } else if(childNode.localName == 'block') {
                foundBlock = true;
            }

          }
        }
        return foundBlock;
    }

    _process_body_node_title(node) {
        this.out_body += '<h3>' + node.textContent.trim() + '</h3>';
    }

    _process_body_node_block(node) {

        for (var i = 0; i < node.childNodes.length; i++) {
          var childNode = node.childNodes[i];
          if(childNode.nodeType !== Node.TEXT_NODE) {
            if(childNode.localName == 'block') {
                this._process_body_node_block_actual_block_node(childNode);
            }
          }
        }

    }

    _process_body_node_block_actual_block_node(blockNode) {

        for (var i = 0; i < blockNode.childNodes.length; i++) {
          var childNode = blockNode.childNodes[i];
          if(childNode.nodeType !== Node.TEXT_NODE) {
            if(childNode.localName == 'text') {

                var marker = '';
                if (this.marker_stack[0]['type'] == 'number') {
                    marker = this.marker_stack[0]['next'] + '.';
                    this.marker_stack[0]['next']++;
                }

                this.out_body += '<div>' + marker + ' ' + childNode.textContent.trim() + '</div>';



            } else if(childNode.localName == 'block') {
                this._process_body_node_block_actual_block_node(childNode);
            } else if(childNode.localName == 'item') {

                this.marker_stack.unshift({
                    'type': 'number',
                    'next': 1,
                })

                this._process_body_node_block(childNode);

                this.marker_stack.shift();
            }

          }
        }



    }

    get() {

        return this.out_body;


    }

}



