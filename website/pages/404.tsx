import HeadMetadata from "@/components/HeadMetadata";
import AlternateHeader from "@/components/AlternateHeader";

export default function _404() {
    return (
        <div className="error-wrapper layout-wrapper">
            <HeadMetadata title="Unknown | zkNews" />
            <AlternateHeader displayMessage="Page Not Found" />
            <span>An error occurred. (ERROR: 400)</span>
        </div>
    );
}
