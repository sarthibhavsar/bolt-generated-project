import { Link, useLocation } from "react-router-dom";

export function BreadcrumbDemo() {
  const { pathname } = useLocation();

  const pathnames = pathname.split("/").filter((x) => x);
  let breadcrumbPaths = "";

  return (
    <div className="px-3 mt-2 w-full text-sm font-semibold text-slate-700">
      <Link to={"/"}>Home</Link>

      {pathnames.map((name, index) => {
        breadcrumbPaths += `/${name}`;
        const isLast = index == pathnames.length - 1;

        return isLast ? (
          <span key={"breadcrumb_" + index} className="font-normal">
            {" "}
            / {name}{" "}
          </span>
        ) : (
          <Link className="" key={"breadcrumb_" + index} to={breadcrumbPaths}>
            {" "}
            / {name}{" "}
          </Link>
        );
      })}
    </div>
  );
}
