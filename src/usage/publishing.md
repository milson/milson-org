---
  title: Publishing
  id: publishing
---

It's very easy to publish documentation with MILDOC.

The gist of it is that you put files on the filesystem and then re-run `build.sh`.

### Meta Data

Go ahead and click the link entitled `Publishing` in the menu on your left.

Notice that up in the URL you see something like <http://milson.github.com/mildoc#publishing>.

The `title` of the link is "Publishing" (uppercase 'P'),
but the `id` of the link is "publishing" (lowercase 'p').

For every document, such as `src/usage/publishing.md`,
there is a `title` and `id`.
If you don't specify either, then the default behavior is to use
the filename without the `.md` suffix for `title` and then the
`id` will be the filename, but with any non-alphanumeric characters
replaced with an `_` (underscore).

MILDOC supports two tiers in a documentation page - a `group` and a `document`.

The defaults for both of these can be edited by creating a `.yml` file of
the same name as the folder or file.

So if you created a file that you wanted to have a title with a special character
such as `/` or `&`, then you can edit the `title` meta-data.

### Groups

Look over at the left menu again.

"Usage" is a group. It represents a folder `src/usage`.
The file that overwrites the `title` and `id` for this group is `src/usage.yml`.

For any group (or document), the default `title`, `id`, and other meta data can
be overwritten using a file of the same name, but ending in `.yml`.

The file looks like this:

    ---
      title: Usage
      id: usage

### Documents

Documents can have their meta data set in the same way that groups can,
however, they can also be overwritten by appending the YAML to the beginning
of the document.

This is called YAML Front Matter, and it looks like this:

    ---
      title: Publishing
      id: publishing
    ---

Notice the extra `---` at the end of the YAML. This is part of the front matter.
It lets us know when the Front Matter ends and the document begins.

So if you have a file like `src/cooking/peaches-and-cream.md`,
you could overwrite the `title` to be "Peaches & Cream" by creating
`src/cooking/peaches-and-cream.yml` or appending the Front Matter to
the beginning of the file.

