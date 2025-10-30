export default function Caught({ caught }) {
  return (
    <div id="my-pc">
      {caught.map((url) => (
        <img src={url} />
      ))}
    </div>
  );
}
