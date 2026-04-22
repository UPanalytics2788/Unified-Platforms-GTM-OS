import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Image from '@tiptap/extension-image';
import { Table } from '@tiptap/extension-table';
import TableRow from '@tiptap/extension-table-row';
import TableCell from '@tiptap/extension-table-cell';
import TableHeader from '@tiptap/extension-table-header';
import { 
  Bold, 
  Italic, 
  List, 
  ListOrdered, 
  Heading1, 
  Heading2, 
  Quote, 
  Undo, 
  Redo,
  Image as ImageIcon,
  Table as TableIcon
} from 'lucide-react';

interface RichTextEditorProps {
  content: string;
  onChange: (content: string) => void;
  placeholder?: string;
  mode?: 'minimal' | 'full';
}

const MenuBar = ({ editor, mode = 'full' }: { editor: any, mode?: 'minimal' | 'full' }) => {
  if (!editor) {
    return null;
  }

  const addImage = () => {
    const url = window.prompt('URL');
    if (url) {
      editor.chain().focus().setImage({ src: url }).run();
    }
  };

  return (
    <div className="flex flex-wrap gap-2 p-2 border-b border-gray-200 bg-gray-50 rounded-t-xl">
      <button
        onClick={() => editor.chain().focus().toggleBold().run()}
        className={`p-2 rounded hover:bg-gray-200 ${editor.isActive('bold') ? 'bg-gray-200 text-brand-primary' : 'text-gray-600'}`}
        type="button"
      >
        <Bold size={18} />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleItalic().run()}
        className={`p-2 rounded hover:bg-gray-200 ${editor.isActive('italic') ? 'bg-gray-200 text-brand-primary' : 'text-gray-600'}`}
        type="button"
      >
        <Italic size={18} />
      </button>
      
      {mode === 'full' && (
        <>
          <div className="w-px h-6 bg-gray-300 mx-1 self-center" />
          <button
            onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
            className={`p-2 rounded hover:bg-gray-200 ${editor.isActive('heading', { level: 1 }) ? 'bg-gray-200 text-brand-primary' : 'text-gray-600'}`}
            type="button"
          >
            <Heading1 size={18} />
          </button>
          <button
            onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
            className={`p-2 rounded hover:bg-gray-200 ${editor.isActive('heading', { level: 2 }) ? 'bg-gray-200 text-brand-primary' : 'text-gray-600'}`}
            type="button"
          >
            <Heading2 size={18} />
          </button>
        </>
      )}

      <div className="w-px h-6 bg-gray-300 mx-1 self-center" />
      <button
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        className={`p-2 rounded hover:bg-gray-200 ${editor.isActive('bulletList') ? 'bg-gray-200 text-brand-primary' : 'text-gray-600'}`}
        type="button"
      >
        <List size={18} />
      </button>
      
      {mode === 'full' && (
        <>
          <button
            onClick={() => editor.chain().focus().toggleOrderedList().run()}
            className={`p-2 rounded hover:bg-gray-200 ${editor.isActive('orderedList') ? 'bg-gray-200 text-brand-primary' : 'text-gray-600'}`}
            type="button"
          >
            <ListOrdered size={18} />
          </button>
          <button
            onClick={() => editor.chain().focus().toggleBlockquote().run()}
            className={`p-2 rounded hover:bg-gray-200 ${editor.isActive('blockquote') ? 'bg-gray-200 text-brand-primary' : 'text-gray-600'}`}
            type="button"
          >
            <Quote size={18} />
          </button>
          <div className="w-px h-6 bg-gray-300 mx-1 self-center" />
          <button
            onClick={addImage}
            className="p-2 rounded hover:bg-gray-200 text-gray-600"
            type="button"
          >
            <ImageIcon size={18} />
          </button>
          <button
            onClick={() => editor.chain().focus().insertTable({ rows: 3, cols: 3, withHeaderRow: true }).run()}
            className="p-2 rounded hover:bg-gray-200 text-gray-600"
            type="button"
          >
            <TableIcon size={18} />
          </button>
        </>
      )}

      <div className="w-px h-6 bg-gray-300 mx-1 self-center ml-auto" />
      <button
        onClick={() => editor.chain().focus().undo().run()}
        className="p-2 rounded hover:bg-gray-200 text-gray-600"
        type="button"
      >
        <Undo size={18} />
      </button>
      <button
        onClick={() => editor.chain().focus().redo().run()}
        className="p-2 rounded hover:bg-gray-200 text-gray-600"
        type="button"
      >
        <Redo size={18} />
      </button>
    </div>
  );
};

export default function RichTextEditor({ content, onChange, placeholder, mode = 'full' }: RichTextEditorProps) {
  const editor = useEditor({
    extensions: mode === 'full' ? [
      StarterKit,
      Image,
      Table.configure({
        resizable: true,
      }),
      TableRow,
      TableHeader,
      TableCell,
    ] : [
      StarterKit,
    ],
    content: content,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
    editorProps: {
      attributes: {
        class: `prose prose-sm sm:prose lg:prose-lg focus:outline-none ${mode === 'minimal' ? 'min-h-[100px]' : 'min-h-[200px]'} p-4 max-w-none`,
      },
    },
  });

  return (
    <div className="border border-gray-200 rounded-xl overflow-hidden focus-within:border-brand-primary transition-colors">
      <MenuBar editor={editor} mode={mode} />
      <EditorContent editor={editor} />
    </div>
  );
}
