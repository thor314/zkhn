import HeadMetadata from "@/components/HeadMetadata";
import AlternateHeader from "@/components/AlternateHeader";

export default function _error() {
    return (
        <div className="error-wrapper layout-wrapper">
            <HeadMetadata title="Error | zkNews" />
            <AlternateHeader displayMessage="Website Error" />
            <span>An error occurred. (ERROR: 500)</span>
        </div>
    );
}
