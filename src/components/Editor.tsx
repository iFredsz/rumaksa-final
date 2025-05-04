import React, { useRef } from 'react';
import { Editor as TinyMCEEditor } from '@tinymce/tinymce-react';
import type { Editor } from 'tinymce';

// Tema dan ikon
import 'tinymce/themes/silver';
import 'tinymce/icons/default';

// Plugins TinyMCE
import 'tinymce/plugins/advlist';
import 'tinymce/plugins/autolink';
import 'tinymce/plugins/link';
import 'tinymce/plugins/image';
import 'tinymce/plugins/charmap';
import 'tinymce/plugins/preview';
import 'tinymce/plugins/anchor';
import 'tinymce/plugins/searchreplace';
import 'tinymce/plugins/visualblocks';
import 'tinymce/plugins/code';
import 'tinymce/plugins/fullscreen';
import 'tinymce/plugins/lists';
import 'tinymce/plugins/insertdatetime';
import 'tinymce/plugins/media';
import 'tinymce/plugins/table';
import 'tinymce/plugins/wordcount';
import 'tinymce/plugins/quickbars';

interface MyEditorProps {
  initialValue?: string; // untuk inisialisasi awal saja
  value?: string; // controlled value dari parent
  onEditorChange?: (content: string, editor: Editor) => void;
}

const MyEditor: React.FC<MyEditorProps> = ({
  initialValue = '',
  value,
  onEditorChange = () => {}
}) => {
  const editorRef = useRef<Editor | null>(null);

  return (
    <TinyMCEEditor
      apiKey="no-api-key"
      licenseKey="gpl"
      value={value} // gunakan value jika tersedia
      initialValue={value === undefined ? initialValue : undefined} // hanya gunakan initialValue satu kali
      onEditorChange={(content, editor) => {
        onEditorChange(content, editor);
      }}
      onInit={(_evt, editor) => {
        editorRef.current = editor;
      }}
      tagName="div"
      inline={false}
      init={{
        height: 500,
        menubar: true,
        directionality: 'ltr',
        plugins: [
          'advlist',
          'autolink',
          'lists',
          'link',
          'image',
          'charmap',
          'preview',
          'anchor',
          'searchreplace',
          'visualblocks',
          'code',
          'fullscreen',
          'insertdatetime',
          'media',
          'table',
          'wordcount',
          'quickbars'
        ],
        toolbar:
          'undo redo | blocks | bold italic forecolor | ' +
          'alignleft aligncenter alignright alignjustify | ' +
          'bullist numlist outdent indent | removeformat | help',
        content_style:
          'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
      }}
    />
  );
};

export default MyEditor;
