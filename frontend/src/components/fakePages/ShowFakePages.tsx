import FakePageTemplate from "./FakePageTemplate";
import useFakePages from "../../store/useFakePage";

export const ShowFakePages = ({
  showArrow = true,
}: {
  showArrow?: boolean;
}) => {
  const { fakePages, removeFakePage } = useFakePages();
  return (
    <>
      {fakePages.map((page) => (
        <FakePageTemplate
          showArrow={showArrow}
          key={page.id}
          isOpen={true}
          onClose={() => removeFakePage(page.id)}
          index={page.id}
          title={page.title}
          children={page.children}
        />
      ))}
    </>
  );
};
