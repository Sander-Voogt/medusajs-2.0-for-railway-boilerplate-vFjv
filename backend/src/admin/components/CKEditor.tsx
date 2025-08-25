import React from 'react';
(async () => {
  const { CKEditor } = await import("@ckeditor/ckeditor5-react");
})();
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { sdk } from '../lib/sdk'; // jouw MedusaJS SDK import
import type { EventInfo, Editor, EditorConfig, EditorWatchdog, ContextWatchdog, WatchdogConfig } from 'ckeditor5';

// Custom upload adapter
class MedusaUploadAdapter {
  constructor(loader) {
    this.loader = loader;
  }

  upload() {
    return this.loader.file.then(async (file) => {
      try {
        const res = await sdk.admin.upload.create({ files: [file] });

        if (res.files && res.files.length > 0) {
          return { default: res.files[0].url };
        } else {
          throw new Error('No file URL returned');
        }
      } catch (err) {
        console.error('Upload error:', err);
        throw err;
      }
    });
  }

  abort() {
    // Optioneel: implement abort logica
  }
}

// Plugin om CKEditor upload adapter te registreren
function MedusaUploadPlugin(editor) {
  editor.plugins.get('FileRepository').createUploadAdapter = (loader) => {
    return new MedusaUploadAdapter(loader);
  };
}

export default function MyEditor({ value, onChange }: { value: string, onChange: ((event: EventInfo<string, unknown>, editor: Editor) => void) }) {
  return (
    <div>
      <CKEditor
        editor={ClassicEditor}
        config={{
          toolbar: [
            'heading', '|', 'bold', 'italic', 'link', 'bulletedList', 'numberedList',
            '|', 'insertTable', 'imageUpload', 'blockQuote', 'undo', 'redo'
          ],
          table: {
            contentToolbar: ['tableColumn', 'tableRow', 'mergeTableCells'],
          },
          extraPlugins: [MedusaUploadPlugin] // upload adapter registreren
        }}
        data={value}
        onChange={onChange}
      />
    </div>
  );
}
