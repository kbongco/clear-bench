import { useEffect, useState } from "react";
import type { ProductSpec } from "../types/Specs/specs";
import { getSpecs } from "../services/specs";
import SpecsView from "../Views/Specs/SpecsView";

export default function SpecsViewContainer() {
  const [specs, setSpecs] = useState<ProductSpec[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    let ignore = false;
    setLoading(true);
    setError(null);
    const fetchData = async () => {
      try {
        const specsItems = await getSpecs();
        if (!ignore) setSpecs(specsItems);
      } catch {
        if (!ignore) setError("Is the backend running properly? ");
      } finally {
        if (!ignore) setLoading(false);
      }
    };
    fetchData();
    return () => {
      ignore = true;
    };
  }, []);

  return (
    <>
      <SpecsView specs={specs} error={error} loading={loading} />
    </>
  );
}
