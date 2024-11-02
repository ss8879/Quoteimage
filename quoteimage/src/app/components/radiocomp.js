export default function Radiocomp({ tag, settag }) {
  return (
    <div className="rcontainer">
      <div className="ricontainer">
        <input
          type="radio"
          id="nf"
          name="checkval"
          onChange={(e) => {
            settag((p) => ({ ...p, cimage: true, cquote: true }));
          }}
        />
        <label htmlFor="nf">Change Completely</label>
      </div>
      <div className="ricontainer">
        <input
          type="radio"
          id="quotef"
          name="checkval"
          onChange={(e) => {
            settag((p) => ({ ...p, cimage: true, cquote: false }));
          }}
        />
        <label htmlFor="quotef">Keep The Quote Same And Change The Image</label>
      </div>
      <div className="ricontainer">
        <input
          type="radio"
          id="imagef"
          name="checkval"
          onChange={(e) => {
            settag((p) => ({ ...p, cimage: false, cquote: true }));
          }}
        />
        <label htmlFor="imagef">Keep The Image Same And Change The Quote</label>
      </div>
    </div>
  );
}
