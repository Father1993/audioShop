import { useClickUOutside } from "@/hooks/useClickOutside";
import { useLang } from "@/hooks/useLang";


const CategorySelect = () => {
  const { open, setOpen, toggle, ref } = useClickUOutside()
  const {translations, lang} = useLang()
  
  return (
    <div>
      
    </div>
  );
};

export default CategorySelect;