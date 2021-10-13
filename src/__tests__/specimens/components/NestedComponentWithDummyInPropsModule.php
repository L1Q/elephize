<?php
/* NOTICE: autogenerated file; Do not edit by hand */
namespace specimens\components;
use VK\Elephize\Builtins\Stdlib;
use VK\Elephize\Builtins\CJSModule;
use VK\Elephize\Builtins\ReactContext;

class NestedComponentWithDummyInPropsModule extends CJSModule {
    /**
     * @var NestedComponentWithDummyInPropsModule $_mod
     */
    private static $_mod;
    public static function getInstance(): NestedComponentWithDummyInPropsModule {
        if (!self::$_mod) {
            self::$_mod = new NestedComponentWithDummyInPropsModule();
        }
        return self::$_mod;
    }

    /**
     * @return string
     */
    public function test() {
        return \specimens\components\NestedComponentWithDummyInProps\NestedComponentWithDummyInProps::getInstance()->render(
            [
                "componentToRender" => \specimens\components\DummyComponent\DummyComponent::getInstance()->render(
                    ["count" => 1],
                    []
                ),
            ],
            []
        );
    }

    private function __construct() {
    }
}
