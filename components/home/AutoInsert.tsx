import { useEffect, useRef } from "react";
import { useAutoAdd } from "../../shared/store";
import useAddLink from "../../shared/hooks/db/useAddLink";

type Props = {};

const AutoInsert = (props: Props) => {
  const link = useAutoAdd((store) => store.data);
  const clear = useAutoAdd((store) => store.clear);
  const { mutate } = useAddLink();
  const isDone = useRef(false);

  useEffect(() => {
    if (link && !isDone.current) {
      mutate({ title: link.title, url: link.url, type: 1 });
      clear();
    }
    return () => {
      isDone.current = true;
    };
  }, []);

  return null;
};

export default AutoInsert;
