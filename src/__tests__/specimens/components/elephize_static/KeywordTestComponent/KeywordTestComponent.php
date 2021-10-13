<?php
/* NOTICE: autogenerated file; Do not edit by hand */
namespace specimens\components\elephize_static\KeywordTestComponent;
use VK\Elephize\Builtins\RenderableComponent;
use VK\Elephize\Builtins\Stdlib;
use VK\Elephize\Builtins\ReactContext;

class KeywordTestComponent extends RenderableComponent {
    /**
     * @var KeywordTestComponent $_mod
     */
    private static $_mod;
    public static function getInstance(): KeywordTestComponent {
        if (!self::$_mod) {
            self::$_mod = new KeywordTestComponent();
        }
        return self::$_mod;
    }

    private function __construct() {
    }

    /**
     * @param mixed[] $props
     * @param mixed[] $children
     * @return ?string
     */
    public function render(array $props, array $children) {
        $anon_3b2ed12 = [0];
        $count = (float) $anon_3b2ed12[0];
        return \VK\Elephize\Builtins\IntrinsicElement::get("div")->render(
            [],
            [
                \VK\Elephize\Builtins\IntrinsicElement::get("p")->render([], ["You clicked ", $count, " times"]),
                \VK\Elephize\Builtins\IntrinsicElement::get("button")->render([], [" Click me "]),
                \VK\Elephize\Builtins\IntrinsicElement::get("button")->render(["disabled" => true], [" Click me "]),
            ]
        );
    }
}
