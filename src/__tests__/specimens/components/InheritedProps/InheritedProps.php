<?php
/* NOTICE: autogenerated file; Do not edit by hand */
namespace specimens\components\InheritedProps;
use VK\Elephize\Builtins\RenderableComponent;
use VK\Elephize\Builtins\Stdlib;
use VK\Elephize\Builtins\ReactContext;

class InheritedProps extends RenderableComponent {
    /**
     * @var InheritedProps $_mod
     */
    private static $_mod;
    public static function getInstance(): InheritedProps {
        if (!self::$_mod) {
            self::$_mod = new InheritedProps();
        }
        return self::$_mod;
    }

    private function __construct() {
    }

    /**
     * @param mixed[] $input_props
     * @param mixed[] $children
     * @return ?string
     */
    public function render(array $input_props, array $children) {
        $props = array_merge(
            [],
            \specimens\components\InheritedPropsModule::getInstance()->default_props ?: [],
            [],
            $input_props ?: [],
            []
        );
        $native_props = Stdlib::objectOmit($props, ["className", "children"]);
        return \VK\Elephize\Builtins\IntrinsicElement::get("label")->render(
            [],
            [
                \VK\Elephize\Builtins\IntrinsicElement::get("input")->render(
                    array_merge(
                        ["type" => "radio", "className" => "Radio__input Radio__visuallyHidden"],
                        $native_props
                    ),
                    []
                ),
                \VK\Elephize\Builtins\IntrinsicElement::get("span")->render(["className" => "Radio__control"], []),
                $children
                    ? \VK\Elephize\Builtins\IntrinsicElement::get("span")->render(
                        ["className" => "Radio__text"],
                        [\VK\Elephize\Builtins\IntrinsicElement::escape($children)]
                    )
                    : $children,
            ]
        );
    }
}
