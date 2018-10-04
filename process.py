
import json
import html

class ProcessDocument:

    def __init__(self, input_filename, output_filename):
        self.input_filename = input_filename
        self.output_filename = output_filename

    def go(self):
        with open(self.input_filename) as fp:
            data = json.load(fp)

        out = ''

        for item in data['document']:

            if item['type'] == 'header':

                out += '<h1>' + html.escape(item['content']) + '</h1>'

            elif item['type'] == 'clause':

                out += '<div>' + html.escape(item['content']) + '</div>'

        print(out)


process_document = ProcessDocument(
    input_filename='worker_co_op_model_rules.json',
    output_filename='out.html'
)
process_document.go()

